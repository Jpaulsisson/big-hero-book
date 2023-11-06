import { NextResponse, NextRequest } from "next/server";


import React from 'react'

;

export async function GET(req: NextRequest) {
  
  const url = new URL(req.url);

  const id = url.searchParams.get('id');
  const API_KEY = process.env.API_KEY

  const response = await fetch(`https://superheroapi.com/api/${API_KEY}/${id}`);

  const data = await response.json();
  
  return NextResponse.json(data);
}
