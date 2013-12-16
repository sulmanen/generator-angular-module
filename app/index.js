'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AngularModuleGenerator = module.exports = function AngularModuleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AngularModuleGenerator, yeoman.generators.Base);

AngularModuleGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'input',
    name: 'moduleName',
    message: 'Name of your module?',
    default: 'ngMod'
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};

AngularModuleGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/js');
  this.mkdir('app/js/angular');
  this.mkdir('app/js/vendor');

  this.mkdir('test');
  this.mkdir('test/spec');
  this.mkdir('test/spec/angular');
  this.mkdir('test/spec/angular/services');
  this.mkdir('test/spec/angular/factories');
  this.mkdir('test/spec/angular/filters');
  this.mkdir('test/vendor');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

AngularModuleGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
