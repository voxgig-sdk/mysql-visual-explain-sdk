# MysqlVisualExplain SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "MysqlVisualExplain",
            "slug": "mysql-visual-explain",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://mysqlexplain.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "query_analysi": {},
                "system_info": {},
            },
        },
        "entity": {
      "query_analysi": {
        "fields": [
          {
            "name": "explainOutput",
            "short": "Raw EXPLAIN output from MySQL",
            "type": "`$OBJECT`",
          },
          {
            "name": "mysqlVersion",
            "short": "MySQL version for compatibility (e.g., 8.0, 5.7)",
            "type": "`$STRING`",
          },
          {
            "name": "query",
            "req": True,
            "short": "The SQL query to analyze and visualize",
            "type": "`$STRING`",
          },
          {
            "name": "recommendations",
            "short": "Performance optimization recommendations",
            "type": "`$ARRAY`",
          },
          {
            "name": "visualization",
            "short": "The visual representation data of the query execution plan",
            "type": "`$OBJECT`",
          },
        ],
        "name": "query_analysi",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/explain",
                "parts": [
                  "api",
                  "explain",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "system_info": {
        "fields": [
          {
            "name": "version",
            "short": "MySQL version string",
            "type": "`$STRING`",
          },
          {
            "name": "versionComment",
            "short": "Additional version information",
            "type": "`$STRING`",
          },
        ],
        "name": "system_info",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/version",
                "parts": [
                  "api",
                  "version",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
