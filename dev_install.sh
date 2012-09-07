if [ ! -d "$HOME/node_modules" ]; then
    mkdir $HOME/node_modules
fi

# Symlink all modules to home-directory dispatch site. This allows
# including files as, eg., require('rooter'), so that singleton
# objects can be shared between different scripts.
# XXX: Is this really guaranteed? The docs[1] seem slightly ambiguous.
# XXX: Also, do we really want *all* node_modules to be installed
#      system-wide?
# 
# 
# [1] http://nodejs.org/api/modules.html#modules_module_caching_caveats

for i in node_modules/*; do
    if [ ! -d "$HOME/node_modules/`basename $i`" ]; then
        ln -s "$PWD/$i" "$HOME/node_modules/`basename $i`"
    fi
done
