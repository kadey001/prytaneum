import { getOrCreateServer } from '../server';

const server = getOrCreateServer();

export type ErrorBody = {
    error: string;
    stack?: string;
    componentStack: string;
};

// TODO: Improve error reporting by sending the error to a logging service. GKE will handle logging for now.
export class ErrorReporter {
    private logger;

    constructor() {
        this.logger = server.log;
    }

    reportClientError(error: ErrorBody) {
        const formattedError = `Client Error: ${error.error}\nComponent Stack: ${error.componentStack}\nStack Trace: ${error.stack}`;
        this.logger.error(formattedError);
    }
}
