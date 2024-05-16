from datetime import datetime

def LogEventConsole(message: str, event='INFO'):
    """Log an event by printing information about it to the console with the current timestamp.
    @Param message = The message to print to console
    @Param event = INFO, DEBUG, WARNING, ERROR, or CRITICAL
    """
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print('{} - Moderation Algo - {} - {}'.format(timestamp, event.upper(), message))