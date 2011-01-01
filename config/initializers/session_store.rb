# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_comic_session',
  :secret      => 'ad1ab4f8990b505098e3524a63bf9001e5b4de1e99fd919a65440b62acf14330e4b585726fed7b5112f8953dd6754904be9772b2406675acd470a20cac98c0d0'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
