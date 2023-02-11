const Joi=require("joi")


const createValidation=(req,res,next)=>{
    const schema=Joi.object().keys({
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'in'] } }).required(),
        phoneNo:Joi.string().length(10).pattern(/^[0-9]+$/).required()
    }).unknown(true)
    const {error}=schema.validate(req.body,{abortEarly:false})
    if(error){
       return res.status(400).send({status:false,message:error.details})
    }else{
        next()
    }    
}

const updateValidation=(req,res,next)=>{
    const schema=Joi.object().keys({
        firstName:Joi.string(),
        lastName:Joi.string(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'in'] } }),
        phoneNo:Joi.string().length(10).pattern(/^[0-9]+$/)
    })
    const {error}=schema.validate(req.body,{abortEarly:false})
    if(error){
       return res.status(400).send({status:false,message:error.details})
    }else{
        next()
    }  
}

module.exports={createValidation,updateValidation}