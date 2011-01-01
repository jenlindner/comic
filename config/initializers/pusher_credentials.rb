class PusherCredentials
  attr_accessor :app_id, :key, :secret
  
  def initialize
    @app_id = Pusher.app_id = '1436'
    @key = Pusher.key = '279b70cc663845e74c75'
    @secret = Pusher.secret = '4491a3468b2f7d0ece6e'
  end
end