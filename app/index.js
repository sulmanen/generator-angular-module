'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AngularModuleGenerator = module.exports = function AngularModuleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function() {
    this.installDependencies({
      skipInstall: options['skip-install']
    });
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
  }, {
    type: 'input',
    name: 'moduleDescription',
    message: 'Module short description...'
  }, {
    type: 'input',
    name: 'version',
    message: 'Module initial version'
  }, {
    type: 'input',
    name: 'author',
    message: '... And you are?'
  }, {
    type: 'input',
    name: 'email',
    message: '... your email address?'
  },
  {
    type: 'input',
    name: 'repository',
    message: 'git repo address?'
  },
  {
    type: 'input',
    name: 'registry',
    message: '... a private bower registry for your module ...',
    default: 'http://localhost:8888'
  }];

  this.prompt(prompts, function(props) {
    this.moduleName = props.moduleName;
    this.author = props.author;
    this.email = props.email;
    this.moduleDescription = props.moduleDescription;
    this.version = props.version;
    this.registry = props.registry;
    this.repository = props.repository;
    cb();
  }.bind(this));
};

AngularModuleGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.copy('appjshintrc', 'app/.jshintrc');
  this.mkdir('app/js');
  this.mkdir('app/js/angular');
  this.mkdir('app/js/vendor');
  this.template('_app.js', 'app/js/angular/app.js');

  this.mkdir('test');
  this.copy('testjshintrc', '.jshintrc');
  this.mkdir('test/spec');
  this.mkdir('test/spec/angular');
  this.mkdir('test/spec/angular/services');
  this.mkdir('test/spec/angular/factories');
  this.mkdir('test/spec/angular/filters');
  this.mkdir('test/vendor');
};

AngularModuleGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('mainjshintrc', '.jshintrc');
  this.template('_Gruntfile.js', 'Gruntfile.js');

  this.mkdir('conf');
  this.copy('karma.conf.js', 'conf/karma.conf.js');
  this.copy('karma.e2e.conf.js', 'conf/karma.e2e.conf.js');

  this.copy('gitignore', '.gitignore');
  this.template('_README.md', 'README.md');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_bowerrc', '.bowerrc');
};
