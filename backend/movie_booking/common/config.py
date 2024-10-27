from pydantic_settings import BaseSettings
from typing import Optional
from functools import lru_cache
from .logger import CommonLogger

logger = CommonLogger()

class EnvironmentError(Exception):
    """環境変数関連のエラー用カスタム例外"""
    pass

class Settings(BaseSettings):
    # Google Places API設定
    GOOGLE_PLACES_API_KEY: Optional[str] = None
    
    # ログ設定
    LOG_TO_FILE: bool = False
    LOG_DIR: str = "logs"
    LOG_FILENAME: Optional[str] = None
    LOG_ROTATION_WHEN: str = "midnight"
    LOG_ROTATION_INTERVAL: int = 1
    LOG_BACKUP_COUNT: int = 5
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

@lru_cache()
def get_settings() -> Settings:
    return Settings()

def verify_environment():
    settings = get_settings()
    missing_vars = []
    
    if not settings.GOOGLE_PLACES_API_KEY:
        missing_vars.append("GOOGLE_PLACES_API_KEY")
    
    if missing_vars:
        error_message = (
            "必要な環境変数が設定されていません:\n" +
            "\n".join([f"- {var}" for var in missing_vars]) +
            "\n\n.envファイルに以下の形式で設定してください:\n" +
            "\n".join([f"{var}=your_{var.lower()}_here" for var in missing_vars])
        )
        logger.error(error_message)
        raise EnvironmentError(error_message)
    
    logger.info("環境変数の検証が完了しました")
    return True
