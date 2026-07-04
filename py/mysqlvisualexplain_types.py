# Typed models for the MysqlVisualExplain SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class QueryAnalysi:
    query: str
    explain_output: Optional[dict] = None
    mysql_version: Optional[str] = None
    recommendation: Optional[list] = None
    visualization: Optional[dict] = None


@dataclass
class QueryAnalysiCreateData:
    explain_output: Optional[dict] = None
    mysql_version: Optional[str] = None
    query: Optional[str] = None
    recommendation: Optional[list] = None
    visualization: Optional[dict] = None


@dataclass
class SystemInfo:
    version: Optional[str] = None
    version_comment: Optional[str] = None


@dataclass
class SystemInfoLoadMatch:
    version: Optional[str] = None
    version_comment: Optional[str] = None

