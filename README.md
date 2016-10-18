# CLI for fc00::/8

This is an early work in progress. It is unstable, buggy, and incomplete. YMMV.

## Installation

```
$ npm install fc00
```

## Commands

```
# initialize fc00 (create ~/.fc00rc)
fc00 init

# list your fc00 ip
fc00 addr

# expand an ipv6 to its full 39 character representation
fc00 pad <ipv6>
```

### Proposed commands

```
# install cjdns
fc00 install

# update cjdns
fc00 update

# generate a cjdns configuration file
fc00 genconf

# add a public peer from North America
fc00 peer add public na

# launch cjdns
fc00 up

# kill cjdns
fc00 down
```
