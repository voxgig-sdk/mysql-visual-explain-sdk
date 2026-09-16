# MysqlVisualExplain SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "explain",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "explain",
                ],
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
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "version",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "version",
                ],
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
