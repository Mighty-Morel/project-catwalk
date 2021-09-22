# run with bash setup.sh
# download node
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
# install node
sudo apt-get install -y nodejs
# set up port forwarding
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3005