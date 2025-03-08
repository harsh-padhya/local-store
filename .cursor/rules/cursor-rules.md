# AI Rules for Project Development in Cursor

## Code Structure and Documentation

1. **Modular Architecture**
   - All code must be designed with modularity and extensibility as core principles
   - Use appropriate design patterns to ensure components can be easily replaced or extended
   - Minimize dependencies between modules to reduce coupling

2. **File Documentation Headers**
   - Every code file MUST begin with a detailed header comment that includes:
     - A clear description of the file's purpose and functionality
     - All external dependencies required by the file
     - Expected inputs and outputs
     - Any side effects or state changes
   - Example format:
     ```
     /**
      * @file: user_authentication.js
      * @description: Handles user authentication logic including login, registration, and session management
      * 
      * @dependencies:
      * - bcrypt (^5.1.0): For password hashing and verification
      * - jsonwebtoken (^9.0.0): For JWT token generation and validation
      * - mongoose (^6.9.0): For database operations
      * 
      * @inputs: User credentials (username/email, password)
      * @outputs: Authentication tokens, user session data
      * 
      * @side_effects: Creates/updates user records in database, manages session state
      */
     ```

3. **Function Documentation**
   - All functions must have JSDoc/equivalent documentation
   - Include parameter types, return values, and exceptions

## Architecture and Planning

1. **Initial Planning**
   - Before writing any implementation code, create a comprehensive architecture plan
   - Define all modules, their responsibilities, and interactions
   - Document data flow between components
   - Create class/component diagrams when appropriate

2. **Project Skeleton**
   - Maintain an up-to-date project skeleton in the README.md
   - Any significant structural changes must be reflected in the README
   - Include directory structure and purpose of each component

3. **Deployment Guidelines**
   - Maintain detailed deployment instructions in a DEPLOYMENT.md file
   - Update deployment documentation whenever architecture changes
   - Include environment setup, build processes, and configuration requirements

## Code Quality and Standards

1. **Naming Conventions**
   - Use descriptive, consistent naming for variables, functions, and classes
   - Follow language-specific conventions (camelCase, PascalCase, etc.)

2. **Error Handling**
   - Implement comprehensive error handling
   - Log errors with appropriate context
   - Provide meaningful error messages

3. **Testing**
   - Write unit tests for all modules
   - Maintain test coverage above 80%
   - Include integration tests for critical paths

## Version Control

1. **Commit Messages**
   - Write descriptive commit messages that explain the purpose of changes
   - Reference issue numbers when applicable
   - Use conventional commit format (feat:, fix:, docs:, etc.)

2. **Branch Strategy**
   - Use feature branches for new development
   - Create pull requests for code review before merging

## AI Agent Guidelines

1. **Approach to Modifications**
   - When modifying existing code, first understand the module's purpose and dependencies
   - Respect the established architecture and patterns
   - Document any architectural decisions that deviate from the original design

2. **Implementation Strategy**
   - When implementing new features:
     1. First understand the overall architecture
     2. Identify which modules need to be modified or created
     3. Plan the implementation approach
     4. Write or update tests
     5. Implement the feature
     6. Update documentation

3. **Documentation Updates**
   - Update file headers when modifying functionality
   - Keep README and deployment documentation in sync with code changes 