module.exports = {


    render: function (view, req, res, locals = {}) {
        res.render(view, locals, function (err, html) {
            console.log(req.session);
            delete req.session.notification;
            delete req.session.notificationtype; 
            res.send(html);
        });
    }
}