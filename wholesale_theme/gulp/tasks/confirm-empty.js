'use strict';
const gulp = require('gulp');
const { log, color, colorText } = require('@sc-utils/ns-logs');
const configurations = require('../extension-mechanism/configurations');
const fs = require('fs');
const inquirer = require('inquirer');

const configs = configurations.getConfigs();
const getConfirmEmptyWorkspace =  async (warningMessage) => {

	const {source_path } = configs.folders.source;
	if(fs.existsSync(source_path) && fs.readdirSync(source_path).length > 0) {
		const values = ['no', 'yes'],
		question = `Continue?`;
		log(colorText(color.YELLOW, warningMessage));
		const answers = await inquirer
			.prompt([
				{
					name: 'deleteWorkspace',
					message: question,
					type: 'list',
					choices: [...values],
					default: values[0]
				},
			]);

		if(answers.deleteWorkspace === values[0]) {				
			return false;
		}
		fs.rmSync(source_path, {recursive: true});
	}
	return true;
}

module.exports = {
	getConfirmEmptyWorkspace: getConfirmEmptyWorkspace
};