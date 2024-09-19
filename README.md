…or create a new repository on the command line
echo "# SBA319MongoDbDatabaseApplication" >> README.md
    git init    
    git add README.md    
    git commit -m "first commit"
    git branch -M main
    git remote add origin https://github.com/MM-BYC/SBA319MongoDbDatabaseApplication.git
    git push -u origin main
    
…or push an existing repository from the command line
    git remote add origin https://github.com/MM-BYC/SBA319MongoDbDatabaseApplication.git
    
    git branch -M main
    git push -u origin main

Abstracted or refactored Routes to Controller - Completed for all data models  

Database is intended for an e-commerce Application.

- To run: at the terminal, use npm run dev
- Use postman to POST, PUT, GET, DELETE
- EndPoint is available data models bike, country, item, user
    o "localhost:PORT/bikes"
    o "localhost:PORT/bikes:_id"
- EndPoint served with MongoDB table->collections->documents
