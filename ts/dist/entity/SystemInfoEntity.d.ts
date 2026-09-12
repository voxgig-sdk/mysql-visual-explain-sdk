import { MysqlVisualExplainEntityBase } from '../MysqlVisualExplainEntityBase';
import type { MysqlVisualExplainSDK } from '../MysqlVisualExplainSDK';
import type { Control } from '../types';
import type { SystemInfo, SystemInfoLoadMatch } from '../MysqlVisualExplainTypes';
declare class SystemInfoEntity extends MysqlVisualExplainEntityBase<SystemInfo> {
    constructor(client: MysqlVisualExplainSDK, entopts: any);
    make(this: SystemInfoEntity): SystemInfoEntity;
    load(this: any, reqmatch?: SystemInfoLoadMatch, ctrl?: Control): Promise<SystemInfoEntity>;
}
export { SystemInfoEntity };
