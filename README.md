## Notification9-Web

##部署方法

1. 安装RVM
    ```
    $ #!bin/sh
    $ gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
    $ curl -sSL https://get.rvm.io | bash -s stable
    or visit [rvm.io](http://rvm.io)
    ```
2. 安装Ruby
    ```
    $ #!/bin/sh
    $ bash -l
    $ rvm install 2.3.0
    $ rvm use 2.3.0
    $ ruby -v
    ```
3. 安装Rack
    ```
    $ gem install rack
    ```
4. 运行服务器
    ```
    $ cd Notification9-Web
    $ rackup client.ru -p 8004
    ```