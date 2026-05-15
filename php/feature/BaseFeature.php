<?php
declare(strict_types=1);

// MysqlVisualExplain SDK base feature

class MysqlVisualExplainBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MysqlVisualExplainContext $ctx, array $options): void {}
    public function PostConstruct(MysqlVisualExplainContext $ctx): void {}
    public function PostConstructEntity(MysqlVisualExplainContext $ctx): void {}
    public function SetData(MysqlVisualExplainContext $ctx): void {}
    public function GetData(MysqlVisualExplainContext $ctx): void {}
    public function GetMatch(MysqlVisualExplainContext $ctx): void {}
    public function SetMatch(MysqlVisualExplainContext $ctx): void {}
    public function PrePoint(MysqlVisualExplainContext $ctx): void {}
    public function PreSpec(MysqlVisualExplainContext $ctx): void {}
    public function PreRequest(MysqlVisualExplainContext $ctx): void {}
    public function PreResponse(MysqlVisualExplainContext $ctx): void {}
    public function PreResult(MysqlVisualExplainContext $ctx): void {}
    public function PreDone(MysqlVisualExplainContext $ctx): void {}
    public function PreUnexpected(MysqlVisualExplainContext $ctx): void {}
}
