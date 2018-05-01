# tools-demo

Descriptions and examples of various dev-ops tools I have built.

All of these utilities are npm packages and can be installed globallly via `npm i -g <pkg-name>`.

## [@buzuli/ops-tools](https://www.npmjs.com/package/@buzuli/ops-tools)

The majority of ops tools are housed in this package. To get a full listing of the commands: `ops-tools --help`.

The `ops` command is a short-hand alias to `ops-tools`.

### `ops couch-follow`

Track changes from a registry (typically used for `repliate.npmjs.com`). The default behavior throttles the number of changes reported and only supplies the most basic information.

A more typical use-case at npm is to follow all changes pulling the full info summary:
```
ops couch-follow -i -F https://replicate.npmjs.com
```

There is also support for writing a historical log of changes to a LevelDB instance and optionally serving this history up from a built-in REST service.
```
ops couch-follow -L data/ralph -i -F -p 7777 https://replicate.npmjs.com
```

### `ops replicate-ami`

Replicate an AMI from one region to all others, optionally making it public (--publish).

To get a feel for it behavior, run in simulation mode:
```
ops replicate-ami --simulate us-west-2 ami-deadbeef
```

With the `--publish` option:
```
ops replicate-ami --simulate --publish us-west-2 ami-deadbeef`
```

### `ops emr-clusters` and `ops emr-cluster-info`

List out EMR clusters in a region:
```
ops emr-clusters
```

Get extended details on a single EMR cluster:
```
ops emr-cluster-info <cluster-id>
```

### `ops nsq-peek` and `ops nsq-send`

These are useful for working with nsqd instances.

Start an nsqd instance on docker:
```
docker run -it -p 4150:4150 nsqio/nsq nsqd
```

Subscribe to an NSQ topic:
```
ops nsq-peek --nsqdHost localhost:4150 --channel buzuli#ephemeral message#ephemeral
```

Send a few messages to NSQ:
```
ops nsq-send messages#ephemeral 'Greetings. I hope this finds you well.'
ops nsq-send messages#ephemeral '{"msg": "What is happending doc?"}'
```

### `ops ec2-find`

Query EC2 instances in a region filtering on various properties.

Find all instances with "redis" in the `Name` tag:
```
ops ec2-find -n 'redis'
```

Find the names of all insances launched using the "my-key" ssh key:
```
ops ec2-find -k 'my-key' -q | flon | grep 'name =' | cut -d '"' -f 2
```

### `ops site-poll`

Poll the status of an HTTP endpoint at a regular interval and report on its status. Cannot be used to await a specific state (see `duerme` below for that), just provides a human-friendly log of availability.

```
node server/poll.js
ops site-poll -t 500 -p 1000 -c 200 http://localhost:8888/
```

# Other Tools

## [npmepm](https://www.npmjs.com/package/npmepm)

Analysis utilities for legacy (on-premise) npmE appliances.

The `epm` command is a short-hand alias to `npmepm`.

The most useful is `npme doctor` which inspects support bundles for common issues:
```
epm doctor replicated-support259399348.tar.gz
```

## [aqui](https://www.npmjs.com/package/aqui)

CLI HTTP client which prioritizes human friendliness.

## [duerme](https://www.npmjs.com/package/duerme)

Poll an API until its status and response matches or max timeout is reached.

Run the example:
```
node server/poll.js
duerme -f 500 -t 500 -T 15000 -u http://localhost:8888
```

## [flon](https://www.npmjs.com/package/flon)

Flatten json out such that you can grep its contents by value path. It is basically gron, but supports infinite streams.

```
aqui get https://registry.npmjs.com/durations -D | flon | grep 'json.versions' | cut -d '"' -f 2 | uniq
```

## [redmod](https://www.npmjs.com/package/redmod)

"Emergency" Redis server. Minimal features, written in pure JavaScript for Node 8+.

```
npx redmod
```
