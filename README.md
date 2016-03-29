## JSR 356 WebSocket API Examples ##

1. Checkout the project to C:/dev/projects
2. mvn clean package install -Dmaven.test.skip=true -DskipTests=true > out
3. Deploy to Whildfly
4. Copy the contents to ./target/websocket-test
5. Add nginx configuration:


	server {
		listen 8321;
		location /websocket-test/ {
			root C:/dev/projects/websocket-broadcast/target;
		}
	}

6. Start servers
7. Browser 1: http://localhost:8080/websocket-broadcast/postal.html
8. Browser 2: http://localhost:8321/websocket-test/postal.html
