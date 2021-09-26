import { ApolloError } from 'apollo-server';

class NotFoundError extends ApolloError {
  constructor(message: string) {
    super(message, 'NOT_FOUND');
  }
}

export { NotFoundError };
