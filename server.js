const app = require('./src/app')

app.listen(app.get('port'), () =>
  console.log(`🚀 Server started 🚀 At  👉   http://localhost:${app.get('port')} `)
)
