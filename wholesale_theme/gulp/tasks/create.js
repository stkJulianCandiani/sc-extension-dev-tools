const gulp = require('gulp')
,   {color, colorText} = require('@sc-utils/ns-logs')
,	PluginError = require('../extension-mechanism/CustomError')
,	configurations = require('../extension-mechanism/configurations')
,	yeoman = require('yeoman-environment')
,	_ = require('underscore')
,	{ getConfirmEmptyWorkspace } = require('./confirm-empty');


'use strict';

var env = yeoman.createEnv();
env.register(require.resolve('../generator-extension'), 'extension');
env.register(require.resolve('../generator-extension/generators/module/index.js'), 'extension:module');
env.register(require.resolve('../generator-extension/generators/cct/index.js'), 'extension:cct');

const configs = configurations.getConfigs();
var extensions_path = configs.folders.source.source_path;

//add all the extension manfiests
function registerExtensions()
{
	var fs = require('fs')
	,	path = require('path');

	var new_extensions_path = []
	,	workspace_ext_path;

	if(!fs.existsSync(extensions_path))
	{
		fs.mkdirSync(extensions_path);
	}

	_.each(fs.readdirSync(extensions_path), function(folder)
	{
		var manifest_path = path.join(extensions_path, folder);

		if(fs.statSync(manifest_path).isDirectory())
		{
			var isExtraFolder = configs.folders.source.extras_path && configs.folders.source.extras_path.includes(folder);

			if(!isExtraFolder)
			{

				workspace_ext_path = manifest_path;
				new_extensions_path.push(workspace_ext_path);
			}
		}
	});

	//update extension paths
	new_extensions_path = new_extensions_path.map((path) => path.replace('\\', '/'));
	configs.folders.extensions_path = new_extensions_path;
	configurations.saveConfigs();
}

async function create()
{
	var task_name = process.argv[2];
	var isExtension = task_name.split(':')[0] === 'extension';
	const warningMessage = `Creating a new theme requires the workspace to be clean. This means that if you continue every changes in your current workspace will be lost.`;
	if(!isExtension  && !await getConfirmEmptyWorkspace(warningMessage)) {
		return;
	}

	registerExtensions();
	var options = {
		gulp_context: 'gulp/generator-extension'
	,	work_folder: configs.folders.source.source_path
	,	deploy_folder: configs.folders.extensions_dest_name
	,	force: true
	,	extensionMode: isExtension
	};
	try {
		await env.run('extension', options);
	} catch(error) {
		
		if(error.message.includes('operation was cancelled') || error.message.includes('Canceling'))
		{
			console.error('gulp ' + task_name, colorText(color.YELLOW, error));
			process.exit(2);
		}
		throw new PluginError('gulp ' + task_name, colorText(color.YELLOW, error));
		
	}
}

async function createModule()
{
	registerExtensions();

	if(configs.folders.extensions_path.length === 0)
	{
		throw new PluginError('gulp extension:create-module', 'Sorry. No valid extensions were found for you to add a new module');
	}

	var options = {
		gulp_context: 'gulp/generator-extension'
	,	work_folder: configs.folders.source.source_path
	,	deploy_folder: configs.folders.extensions_dest_name
	,	force: true
	};

	await env.run('extension:module', options);
}

async function createCCT()
{
	registerExtensions();

	if(configs.folders.extensions_path.length === 0)
	{
		throw new PluginError('gulp extension:create-cct', 'Sorry. No valid extensions were found for you to add a new CCT');
	}

	var options = {
		gulp_context: 'gulp/generator-extension'
	,	work_folder: configs.folders.source.source_path
	,	deploy_folder: configs.folders.extensions_dest_name
	,	force: true
	};

	try {
		await env.run('extension:cct', options);
	} catch(error) {
		if (error.message.includes('operation was cancelled') || error.message.includes('Canceling')) {
			console.error('gulp extension:create-cct', colorText(color.YELLOW, error));
			process.exit(2);
		}
		throw new PluginError('gulp extension:create-cct', colorText(color.YELLOW, error));
	}
}

if(configs.extensionMode)
{
	/**
	 * Scaffolds an extension for you.
	 * @task {extension:create}
	 * @order {1}
	 */
	
	gulp.task('extension:create', create);

	/**
	 * Adds an example module into an extension.
	 * @task {extension:create-module}
	 * @order {3}
	 */
	gulp.task('extension:create-module', createModule);

	/**
	 * Adds an example CCT into an extension.
	 * @task {extension:create-cct}
	 * @order {2}
	 */
	gulp.task('extension:create-cct', createCCT);
}
else
{
	/**
	 * Scaffolds a new theme of type fallback for you.
	 * @task {theme:create}
	 * @order {1}
	 */
	gulp.task('theme:create', create);
}
