/* Music accounts: where the account service lives.

   Email sign-in, progress that follows the account, and the private files
   School shows to approved members all run on a Supabase project. These two
   values say which one. Both are meant to be public: the "anon" key only lets
   a browser ask, and the database's own rules decide what each signed-in
   person may read or write (see cloud/setup.sql).

   Left empty, Music has no accounts: every tool keeps working and saves on the
   device, exactly as before. */
self.MUSIC_CLOUD = {
  url: "",
  anonKey: ""
};
