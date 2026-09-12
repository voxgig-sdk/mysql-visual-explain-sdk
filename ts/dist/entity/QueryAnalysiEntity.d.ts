import { MysqlVisualExplainEntityBase } from '../MysqlVisualExplainEntityBase';
import type { MysqlVisualExplainSDK } from '../MysqlVisualExplainSDK';
import type { Control } from '../types';
import type { QueryAnalysi, QueryAnalysiCreateData } from '../MysqlVisualExplainTypes';
declare class QueryAnalysiEntity extends MysqlVisualExplainEntityBase<QueryAnalysi> {
    constructor(client: MysqlVisualExplainSDK, entopts: any);
    make(this: QueryAnalysiEntity): QueryAnalysiEntity;
    create(this: any, reqdata?: QueryAnalysiCreateData, ctrl?: Control): Promise<QueryAnalysiEntity>;
}
export { QueryAnalysiEntity };
