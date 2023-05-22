// 有一个小词典有若干敏感词, 一篇大文章
// 收集大文章中包含的所有小词典中的敏感词
//复杂度O(N)

class TreeNode {
    anode: string = "";//debugger节点名
    end: string = "";//存在代表是结尾，把end代表该字符串
    endUse: boolean = false;//是不是已经使用过
    fail: TreeNode | null = null; //树的fail指针，含义：fail指针指向的TreeNode节点代表当前匹配的字符串可以被后续最长匹配多少
    nexts: Map<string, TreeNode> = new Map()
    constructor(name: string) {
        this.anode = name;
    }
}

class ACautomation {
    private root: TreeNode = new TreeNode('root');
    //假设字典由a-z组成
    constructor(dictionary: string[]) {
        this.buildPrifixTree(dictionary)
    }
    private buildPrifixTree(dictionary: string[]) {
        //初始化前缀树
        for (let i = 0; i < dictionary.length; i++) {
            const strArr = dictionary[i].split("");
            let cur = this.root;
            for (let j = 0; j < strArr.length; j++) {
                const str = strArr[j];
                if (!cur.nexts.has(str)) {
                    cur.nexts.set(str, new TreeNode(str))
                }
                cur = cur.nexts.get(str) as TreeNode;
            }
            cur.end = dictionary[i];
        }

        //设置前缀树的fail指针（广度优先遍历）
        let queue = [this.root];


        while (queue.length != 0) {
            const newQueue: TreeNode[] = [];
            for (let i = 0; i < queue.length; i++) {
                const node = queue[i];

                node.nexts.forEach((val, key) => {
                    const next = val;
                    let cur = node;
                    next.fail = this.root
                    while (cur.fail !== null) {
                        if (cur.fail.nexts.get(key)) {
                            next.fail = cur.fail.nexts.get(key) as TreeNode
                            break;
                        }
                        cur = cur.fail
                    }
                    newQueue.push(next)
                })
            }
            queue = newQueue;
        }
    }

    findHitWord(artical: string): string[] {
        const res: string[] = [];
        const strs = artical.split("");
        let cur: TreeNode = this.root;
        //循环每一个值
        for (let i = 0; i < strs.length; i++) {
            const str = strs[i];
            //找到第一个匹配到的字符
            while (cur !== this.root && !cur.nexts.has(str)) {
                cur = cur.fail as TreeNode
            }

            cur = cur.nexts.has(str) ? cur.nexts.get(str) as TreeNode : this.root
            if (cur == this.root) {
                continue;
            }

            let newCur: TreeNode | null = cur;

            while (newCur !== null) {
                if (newCur.end && !newCur.endUse) {
                    res.push(newCur.end);
                    newCur.endUse = true;
                }
                newCur = newCur.fail
            }
        }

        return res
    }
}




(() => {
    const dictionary = ['aab', 'cds', 'a']
    const artical = 'aabadscdsa'
    const ac = new ACautomation(dictionary)
    console.log(ac.findHitWord(artical));
})()