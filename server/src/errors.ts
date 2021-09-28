import { ApolloError } from 'apollo-server';

class NotFoundError extends ApolloError {
  constructor(message = 'Not found') {
    super(message, 'NOT_FOUND');
  }
}

export { NotFoundError };
