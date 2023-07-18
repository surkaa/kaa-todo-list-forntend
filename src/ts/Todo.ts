export class Todo {

    private _id: number;             // 笔记id
    private _uid: number             // 创建这个笔记的用户id
    private _flag: boolean;          // 是否完成
    private _title: string;          // 待办事项的标题
    private _description: string;    // 细节描述
    private _createTime: string;     // 创建时间
    private _targetTile: string      // 预计完成时间按
    private _updateTime: string      // 更新时间
    private _noteStatus: number      // 笔记状态

    constructor(
        id: number,
        title: string,
        uid: number = 0,
        flag: boolean = false,
        description: string = '',
        createTime: string = '',
        targetTile: string = '',
        updateTime: string = '',
        noteStatus: number = 0
    ) {
        this._id = id;
        this._uid = uid;
        this._flag = flag;
        this._title = title;
        this._description = description;
        this._createTime = createTime;
        this._targetTile = targetTile;
        this._updateTime = updateTime;
        this._noteStatus = noteStatus;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get uid(): number {
        return this._uid;
    }

    set uid(value: number) {
        this._uid = value;
    }

    get flag(): boolean {
        return this._flag;
    }

    set flag(value: boolean) {
        this._flag = value;
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

    get createTime(): string {
        return this._createTime;
    }

    set createTime(value: string) {
        this._createTime = value;
    }

    get targetTile(): string {
        return this._targetTile;
    }

    set targetTile(value: string) {
        this._targetTile = value;
    }

    get updateTime(): string {
        return this._updateTime;
    }

    set updateTime(value: string) {
        this._updateTime = value;
    }

    get noteStatus(): number {
        return this._noteStatus;
    }

    set noteStatus(value: number) {
        this._noteStatus = value;
    }
}