module.exports = {
    
        deleteNotification: function (req, res, callback) {
            delete req.session.notification;
            delete req.session.notificationtype;
            callback;
        },

        renderer: function (view, req, res, callback) {
            res.render(view, this.deleteNotification(req, res, callback));
        }
}