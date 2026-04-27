export const openApiDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Customer Dashboard API',
    version: '1.0.0',
    description: 'API documentation for customer management endpoints.',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local development server',
    },
  ],
  tags: [{ name: 'Customers', description: 'Customer management endpoints' }],
  components: {
    schemas: {
      Customer: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '4d0a1d2d-57e6-42e3-86e0-becac0ea1f64' },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', format: 'email', example: 'john@example.com' },
          phone: { type: 'string', example: '9876543210' },
        },
      },
      CreateCustomerRequest: {
        type: 'object',
        required: ['name', 'email', 'phone'],
        properties: {
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', format: 'email', example: 'john@example.com' },
          phone: { type: 'string', example: '9876543210' },
        },
      },
      CustomerListResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Customers fetched successfully.' },
          data: {
            type: 'array',
            items: { $ref: '#/components/schemas/Customer' },
          },
        },
      },
      CustomerResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Customer created successfully.' },
          data: { $ref: '#/components/schemas/Customer' },
        },
      },
      CommonSuccessResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Customer deleted successfully.' },
          data: { type: 'null', example: null },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Customer not found.' },
          data: { type: 'null', example: null },
        },
      },
    },
  },
  paths: {
    '/api/customers': {
      get: {
        tags: ['Customers'],
        summary: 'Get all customers',
        responses: {
          '200': {
            description: 'Customers retrieved successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CustomerListResponse' },
                examples: {
                  success: {
                    value: {
                      success: true,
                      message: 'Customers fetched successfully.',
                      data: [
                        {
                          id: '4d0a1d2d-57e6-42e3-86e0-becac0ea1f64',
                          name: 'John Doe',
                          email: 'john@example.com',
                          phone: '9876543210',
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: {
                  serverError: {
                    value: { success: false, message: 'Internal server error.', data: null },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Customers'],
        summary: 'Create a customer',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateCustomerRequest' },
              examples: {
                validRequest: {
                  value: {
                    name: 'Jane Smith',
                    email: 'jane.smith@example.com',
                    phone: '9123456780',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Customer created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CustomerResponse' },
                examples: {
                  success: {
                    value: {
                      success: true,
                      message: 'Customer created successfully.',
                      data: {
                        id: '109ad844-eb83-43f6-9809-2d5b5eca7819',
                        name: 'Jane Smith',
                        email: 'jane.smith@example.com',
                        phone: '9123456780',
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: {
                  invalidEmail: {
                    value: {
                      success: false,
                      message: 'Please provide a valid email address.',
                      data: null,
                    },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: {
                  serverError: {
                    value: { success: false, message: 'Internal server error.', data: null },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/customers/{id}': {
      delete: {
        tags: ['Customers'],
        summary: 'Delete a customer',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Customer ID',
            example: '109ad844-eb83-43f6-9809-2d5b5eca7819',
          },
        ],
        responses: {
          '200': {
            description: 'Customer deleted successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CommonSuccessResponse' },
                examples: {
                  success: {
                    value: {
                      success: true,
                      message: 'Customer deleted successfully.',
                      data: null,
                    },
                  },
                },
              },
            },
          },
          '404': {
            description: 'Customer not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: {
                  notFound: {
                    value: {
                      success: false,
                      message: 'Customer not found.',
                      data: null,
                    },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: {
                  serverError: {
                    value: { success: false, message: 'Internal server error.', data: null },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} as const

