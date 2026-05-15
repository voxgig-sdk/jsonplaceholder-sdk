<?php
declare(strict_types=1);

// Jsonplaceholder SDK base feature

class JsonplaceholderBaseFeature
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

    public function init(JsonplaceholderContext $ctx, array $options): void {}
    public function PostConstruct(JsonplaceholderContext $ctx): void {}
    public function PostConstructEntity(JsonplaceholderContext $ctx): void {}
    public function SetData(JsonplaceholderContext $ctx): void {}
    public function GetData(JsonplaceholderContext $ctx): void {}
    public function GetMatch(JsonplaceholderContext $ctx): void {}
    public function SetMatch(JsonplaceholderContext $ctx): void {}
    public function PrePoint(JsonplaceholderContext $ctx): void {}
    public function PreSpec(JsonplaceholderContext $ctx): void {}
    public function PreRequest(JsonplaceholderContext $ctx): void {}
    public function PreResponse(JsonplaceholderContext $ctx): void {}
    public function PreResult(JsonplaceholderContext $ctx): void {}
    public function PreDone(JsonplaceholderContext $ctx): void {}
    public function PreUnexpected(JsonplaceholderContext $ctx): void {}
}
