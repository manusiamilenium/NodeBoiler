module.exports = {
    handleResult: async (error, rows,fields,onSuccess,onError) => {
        if (error) {
            console.log(error);
            await onError(error);
        } else {
            await onSuccess(rows);
        }
    
    }
}