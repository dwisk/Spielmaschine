# Spielmaschine
A pixelnode application

# Network Routing
## gamedroid:
up /sbin/route add -net 192.168.42.0/24 gw 192.168.4.10
down /sbin/route del -net 192.168.42.0/24 gw 192.168.4.10

## pixelpusher-pi
up route add -net 192.168.3.0/24 gw 192.168.4.11
down route del -net 192.168.3.0/24 gw 192.168.4.11
