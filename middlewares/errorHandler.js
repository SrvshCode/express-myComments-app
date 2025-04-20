const { constants } = require("../constants");

const errorHandler =(err,req,res,next)=>{
    const statusCode= res.statusCode? res.statusCode: 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({Title:`Validation Error`,
                message:err.message,
                Stacktrace:err.stack
            })            
            break;
        case constants.UNAUTHORIZED:
            res.json({Title:`Unauthorised`,
                message:err.message,
                Stacktrace:err.stack
            })
            break;
        case constants.FORBIDDEN:
            res.json({Title:`Forbidden`,
                message:err.message,
                Stacktrace:err.stack
            })
            break;
        case constants.NOT_FOUND:
            res.json({Title:`Not Found`,
                message:err.message,
                Stacktrace:err.stack
            })
            break;
        case constants.SERVER_ERROR:
            res.json({Title:`Internal Server Error`,
                message:err.message,
                Stacktrace:err.stack
            })    
            break;
        default:
            console.log("All Good,No Error")
            break;
    }
}

module.exports=errorHandler;