/*
 * zidian use
 * 2019-08-10
 * 
 */

(function (window) {

    var zidian = {
        config: {
            host: location.origin,
            word: {
                rows: 30,
                source: "/dist/word/00.json"
            },
            ci: {
                rows: 600,
                source: "/dist/ci/00.json"
            },
            idiom: {
                rows: 150,
                source: "/dist/idiom/00.json"
            }
        },
        cache: {
            word: {},
            ci: {},
            idiom: {},
            promise: {}
        },
        //��ȡKYES
        taskKeys: function (type) {
            return zidian.cache.promise[type] = new Promise(function (resolve) {
                var keys = zidian.cache[type]["00"] || [];
                if (keys.length) {
                    resolve(keys);
                } else {
                    fetch(zidian.config.host + zidian.config[type].source).then(x => x.json()).then(function (res) {
                        zidian.cache[type]["00"] = keys = res;
                        resolve(keys)
                    })
                }
            })
        },
        //��ȡKEY������ҳ
        taskItems: function (type, key) {
            return new Promise(function (resolve) {
                (zidian.cache.promise[type] || zidian.taskKeys(type)).then(function (keys) {
                    var ki = keys.indexOf(key);
                    if (ki >= 0) {
                        var pi = Math.ceil((ki + 1) / zidian.config[type].rows) - 1;
                        var ii = ki - pi * zidian.config[type].rows;
                        var pd = zidian.cache[type][pi] || [];
                        if (pd.length) {
                            resolve(pd[ii]);
                        } else {
                            fetch(zidian.config.host + zidian.config[type].source.replace("00", pi)).then(x => x.json()).then(function (res) {
                                zidian.cache[type][pi] = pd = res;
                                resolve(pd[ii]);
                            })
                        }
                    } else {
                        resolve();
                    }
                })
            })
        },
        //ģ��������
        likeCi: function (key) {
            return new Promise(function (resolve) {
                var type = 'ci';
                (zidian.cache.promise[type] || zidian.taskKeys(type)).then(function (keys) {
                    var res = [];
                    keys.forEach(x => {
                        x.indexOf(key) >= 0 && res.push(x);
                    })
                    resolve(res);
                })
            })
        },
        //ģ����������
        likeIdiom: function (key) {
            return new Promise(function (resolve) {
                var type = 'idiom';
                (zidian.cache.promise[type] || zidian.taskKeys(type)).then(function (keys) {
                    var res = [];
                    keys.forEach(x => {
                        x.indexOf(key) >= 0 && res.push(x);
                    })
                    resolve(res);
                })
            })
        },
        //��ѯ��
        equalWord: function (key) {
            return new Promise(function (resolve) {
                zidian.taskItems('word', key).then(resolve)
            })
        },
        //��ѯ��
        equalCi: function (key) {
            return new Promise(function (resolve) {
                zidian.taskItems('ci', key).then(resolve)
            })
        },
        //��ѯ����
        equalIdiom: function (key) {
            return new Promise(function (resolve) {
                zidian.taskItems('idiom', key).then(resolve)
            })
        }
    }

    window.zidian = zidian;

})(window);