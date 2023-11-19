#!/bin/bash
# ex: ts=8 sw=4 sts=4 et filetype=sh
#
# SPDX-License-Identifier: GPL-3.0-or-later
#
docker run -d \
  --name db \
  -e POSTGRES_PASSWORD=aulasystem \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -v asdbvol:/var/lib/postgresql/data \
  --publish 5432:5432 \
  postgres:16
