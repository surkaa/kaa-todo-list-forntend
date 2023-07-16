export class Todo {

    private _title: string;          // 待办事项的标题
    private _description: string;    // 细节描述
    private _flag: boolean;          // 是否完成
    private _tag: string[];          // 标签
    private _priority: number;       // 优先级
    private _children: Todo[];       // 子任务

    constructor(
        title: string,
        description: string = '',
        flag: boolean = false,
        tag: string[] = [],
        priority: number = 1,
        children: Todo[] = []
    ) {
        this._title = title;
        this._description = description;
        this._flag = flag
        this._tag = tag;
        this._priority = priority;
        this._children = children;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get flag(): boolean {
        return this._flag;
    }

    set flag(value: boolean) {
        this._flag = value;
    }

    get tag(): string[] {
        return this._tag;
    }

    set tag(value: string[]) {
        this._tag = value;
    }

    get priority(): number {
        return this._priority;
    }

    set priority(value: number) {
        this._priority = value;
    }

    get children(): Todo[] {
        return this._children;
    }

    set children(value: Todo[]) {
        this._children = value;
    }
}