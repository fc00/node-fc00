# CLI for fc00::/8

This is an early work in progress. It is unstable, buggy, and incomplete. YMMV.

## Installation

```
$ npm install fc00
```

## Usage as a library

```javascript
var Fc00 = require("fc00");

// list your fc00 address(es) (array)
console.log(Fc00.addr());

// check your version of fc00
Fc00.version();

// expand an ip to its full 39 character representation
Fc00.padIpv6("fc00::");
```

## Command Line Interface

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

# terminate cjdns
fc00 down

# check what version of fc00 and cjdns you're running
fc00 version

# add a password to your running configuration file
fc00 password

# ping a cjdns address or public key
fc00 ping

# get statistics about your peers
fc00 peer stats

# convert a public key to a padded ipv6
fc00 pub-to-ipv6

# convert a private key to a public key
# or convert a public key to an ipv6
# takes any number of arguments to convert
fc00 convert <privkey> <pubkey>

# generate the corresponding public key for a private key
fc00 ???

# generate a bug report
fc00 report
```

### Commands which might not make sense anymore

```

# pathfinder tree
fc00 tree

# sort a list of ipv6s
fc00 sort <list> <of> <addresses>

```
