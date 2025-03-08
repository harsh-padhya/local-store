/**
 * @file: file-template.js
 * @description: This is a template file demonstrating the required documentation format for all code files.
 * This file shows how to properly document a module's purpose, dependencies, inputs, outputs, and side effects.
 * 
 * @dependencies:
 * - example-package (^1.2.3): Brief description of why this dependency is needed
 * - another-package (^4.5.6): Brief description of why this dependency is needed
 * 
 * @inputs: Describe the expected inputs to this module (e.g., function parameters, environment variables)
 * @outputs: Describe the outputs from this module (e.g., return values, emitted events)
 * 
 * @side_effects: Document any side effects this module may have (e.g., file system changes, database operations)
 */

'use strict';

// Import dependencies
const examplePackage = require('example-package');
const anotherPackage = require('another-package');

/**
 * Example function with JSDoc documentation
 * 
 * @param {string} param1 - Description of the first parameter
 * @param {number} param2 - Description of the second parameter
 * @param {Object} options - Configuration options
 * @param {boolean} options.flag - Description of the flag option
 * @returns {Promise<Array>} - Description of the return value
 * @throws {Error} - Description of potential errors
 */
async function exampleFunction(param1, param2, options = {}) {
  try {
    // Function implementation
    const result = await examplePackage.doSomething(param1, param2);
    
    if (options.flag) {
      return anotherPackage.process(result);
    }
    
    return result;
  } catch (error) {
    // Error handling
    console.error('Error in exampleFunction:', error);
    throw new Error(`Failed to process data: ${error.message}`);
  }
}

/**
 * Example class with JSDoc documentation
 */
class ExampleClass {
  /**
   * Constructor for ExampleClass
   * 
   * @param {Object} config - Configuration object
   */
  constructor(config) {
    this.config = config;
    this.initialized = false;
  }
  
  /**
   * Initialize the instance
   * 
   * @returns {boolean} - Success status
   */
  initialize() {
    // Implementation
    this.initialized = true;
    return this.initialized;
  }
  
  /**
   * Process data using this class
   * 
   * @param {Array} data - Data to process
   * @returns {Object} - Processed result
   */
  processData(data) {
    if (!this.initialized) {
      throw new Error('Class not initialized');
    }
    
    // Implementation
    return {
      result: 'processed data',
      timestamp: new Date()
    };
  }
}

// Export module components
module.exports = {
  exampleFunction,
  ExampleClass
}; 