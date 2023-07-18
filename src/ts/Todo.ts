export interface Todo {
    id: number;             // 笔记id
    uid: number             // 创建这个笔记的用户id
    flag: number;          // 是否完成
    title: string;          // 待办事项的标题
    description: string;    // 细节描述
    createTime: string;     // 创建时间
    targetTile: string      // 预计完成时间按
    updateTime: string      // 更新时间
    noteStatus: number      // 笔记状态
}