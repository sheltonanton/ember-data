import Route from '@ember/routing/route';

export default Route.extend({
    model: function(){
        return this.get('store').findAll('system');
    },
    actions: {
        didTransition: function(){
            //task:5
            // let system = this.get('store').peekAll('system');
            // var promise = new Promise((resolve, reject) => {
            //     system.save().then(() => {
            //         resolve();
            //     }).catch(()=> {
            //         reject();
            //     })
            // });
            // (async function (){
            //     await promise.then();
            //     return promise;
            // })();
        }
    }
});
