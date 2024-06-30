const AWS = require('aws-sdk')
AWS.config.update({ region: 'eu-west-1' })

const MOOSEND_API_KEY = process.env.MOOSEND_API_KEY
const MAILING_LIST_ID = process.env.MAILING_LIST_ID

const addSubscriber = async (params) => {
  const response = await fetch(
    `https://api.moosend.com/v3/subscribers/${MAILING_LIST_ID}/subscribe.json?apikey=${MOOSEND_API_KEY}`, 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Email: params.email,
        Mobile: params.phone_number,
        HasExternalDoubleOptIn: true,
        CustomFields: [
          `user_id=${params.sub}`,
          `user_name=${params.userName}`,
        ],
        Tags: [
          'user_registered',
        ]
      })
    })

  const data = await response.json()
  return data.Error
}

exports.handler = async (request, context, callback) => {
  try {
    console.log(request)
    const { userName } = request
    const { email, sub, phone_number } = request.request.userAttributes

    /*if (request.request.userAttributes['custom:marketing_consent'] === 'true') {
      const error = await addSubscriber({
        userName,
        email,
        sub,
        phone_number,
      })
    
      if (error.includes('Mobile is invalid')) {
        await addSubscriber({
          userName,
          email,
          sub,
        })
        throw new Error(`invalid number ${phone_number}, adding without`)
      }
      
      if (error) {
        throw new Error(error)
      }
    } */
  } catch (error) {
    console.log(error)
  }
  callback(null, request)
}