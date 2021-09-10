import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
<<<<<<< HEAD
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache'
});


=======
>>>>>>> 5b629efa192e63f2ba4c9cb3b9eb38f1dc4043a0
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }
        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
          }
        } 

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        }
      });
 
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
<<<<<<< HEAD
              import React, { useState }  from 'react-select';
=======
              import React, { useState } from 'react';
              const axios = require ('axios');
>>>>>>> 5b629efa192e63f2ba4c9cb3b9eb38f1dc4043a0
              console.log(React, useState);
            `,
          };
        } 
<<<<<<< HEAD
        // Check to see if we have already fetched this file
        // and if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        // if it is, return it immediately
        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);
        const result: esbuild.OnLoadResult =  {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        //store response in cache
        await fileCache.setItem(args.path, result);

        return result;
=======
        const { data, request } = await axios.get(args.path);
        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        }
>>>>>>> 5b629efa192e63f2ba4c9cb3b9eb38f1dc4043a0
      });
    },
  };
};