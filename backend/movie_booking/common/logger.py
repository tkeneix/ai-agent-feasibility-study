import logging
from logging.handlers import TimedRotatingFileHandler
import sys
import traceback
from functools import wraps
from typing import Optional
import os
from datetime import datetime

class CommonLogger:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(CommonLogger, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance
    
    def __init__(self):
        if self._initialized:
            return
            
        self.logger = logging.getLogger('common')
        self.logger.setLevel(logging.INFO)
        self._initialized = True
        
        # デフォルトのフォーマッター
        self.formatter = logging.Formatter(
            '%(asctime)s [%(levelname)s] %(name)s - %(message)s'
        )
        
        # デフォルトで標準出力に出力
        self._setup_console_handler()
    
    def _setup_console_handler(self):
        """標準出力ハンドラーのセットアップ"""
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setFormatter(self.formatter)
        self.logger.addHandler(console_handler)
    
    def setup_file_handler(self, 
                          log_dir: str = "logs",
                          filename: Optional[str] = None,
                          max_bytes: int = 10485760,  # 10MB
                          backup_count: int = 5,
                          when: str = 'midnight',
                          interval: int = 1):
        """ファイル出力ハンドラーのセットアップ"""
        os.makedirs(log_dir, exist_ok=True)
        
        if filename is None:
            filename = f"application_{datetime.now().strftime('%Y%m%d')}.log"
        
        file_path = os.path.join(log_dir, filename)
        file_handler = TimedRotatingFileHandler(
            filename=file_path,
            when=when,
            interval=interval,
            backupCount=backup_count
        )
        file_handler.setFormatter(self.formatter)
        self.logger.addHandler(file_handler)
    
    def log_exception(self, exc: Exception, additional_info: str = ""):
        """例外をログ出力"""
        exc_info = ''.join(traceback.format_exception(type(exc), exc, exc.__traceback__))
        self.logger.error(f"{additional_info}\n{exc_info}")
    
    def info(self, message: str):
        self.logger.info(message)
    
    def error(self, message: str):
        self.logger.error(message)
    
    def debug(self, message: str):
        self.logger.debug(message)
    
    def warning(self, message: str):
        self.logger.warning(message)

def log_async_function(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        logger = CommonLogger()
        func_name = func.__name__
        logger.info(f"Starting {func_name}")
        try:
            result = await func(*args, **kwargs)
            logger.info(f"Completed {func_name}")
            return result
        except Exception as e:
            logger.log_exception(e, f"Error in {func_name}")
            raise
    return wrapper

def log_function(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        logger = CommonLogger()
        func_name = func.__name__
        logger.info(f"Starting {func_name}")
        try:
            result = func(*args, **kwargs)
            logger.info(f"Completed {func_name}")
            return result
        except Exception as e:
            logger.log_exception(e, f"Error in {func_name}")
            raise
    return wrapper
