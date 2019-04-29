import Mock from 'mockjs2'

if(process.env.NODE_ENV !== 'production'){
  console.log('mock mounting')

  require('./services/auth')
  require('./services/statistics')
  
  Mock.setup({
    timeout: 800 // setter delay time
  })
  console.log('mock mounted')
}