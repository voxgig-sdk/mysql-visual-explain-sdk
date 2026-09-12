import { QueryAnalysiEntity } from './entity/QueryAnalysiEntity';
import { SystemInfoEntity } from './entity/SystemInfoEntity';
export type * from './MysqlVisualExplainTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { MysqlVisualExplainEntityBase } from './MysqlVisualExplainEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class MysqlVisualExplainSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    QueryAnalysi(entopts?: Record<string, any>): QueryAnalysiEntity;
    SystemInfo(entopts?: Record<string, any>): SystemInfoEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): MysqlVisualExplainSDK;
    tester(testopts?: any, sdkopts?: any): MysqlVisualExplainSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof MysqlVisualExplainSDK;
export { stdutil, config, BaseFeature, MysqlVisualExplainEntityBase, MysqlVisualExplainSDK, SDK, };
