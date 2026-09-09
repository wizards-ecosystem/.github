import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export async function composeEcosystem(brandRoot,sourceRoot=path.join(brandRoot,'source/ecosystem')){
const {data: source, info} = await sharp(path.join(sourceRoot,'approved-composition.png')).raw().toBuffer({resolveWithObject:true});
const mountain = [[623,736],[685,716],[756,679],[797,646],[836,617],[874,576],[901,551],[930,533],[942,545],[956,558],[969,560],[980,574],[994,590],[1008,604],[1023,610],[1041,641],[1060,657],[1090,642],[1123,628],[1150,613],[1169,624],[1195,650],[1220,662],[1247,684],[1280,696],[1315,705],[1351,715],[1371,730],[1350,749],[1310,754],[1260,759],[1210,758],[1160,761],[1110,751],[1070,763],[1030,751],[985,760],[939,754],[891,749],[853,755],[817,746],[780,756],[745,746],[700,749],[654,741]];
function contains(x,y,poly) {
  let inside=false;
  for(let i=0,j=poly.length-1;i<poly.length;j=i++) {
    const [ax,ay]=poly[i], [bx,by]=poly[j];
    if((ay>y)!==(by>y) && x<(bx-ax)*(y-ay)/(by-ay)+ax) inside=!inside;
  }
  return inside;
}
const art = Buffer.alloc(info.width*info.height*4);
const caption = Buffer.alloc(info.width*info.height*4);
const darkArt = Buffer.alloc(info.width*info.height*4);
const darkCaption = Buffer.alloc(info.width*info.height*4);
for(let y=0;y<info.height;y++) for(let x=0;x<info.width;x++) {
  const p=(y*info.width+x)*3, q=(y*info.width+x)*4;
  const rgb=[source[p],source[p+1],source[p+2]];
  const low=Math.min(...rgb), high=Math.max(...rgb), chroma=high-low;
  const onMountain=y>=533 && y<=765 && contains(x+.5,y+.5,mountain) &&
    contains(x+.5,y+16,mountain) && contains(x-4,y+6,mountain) && contains(x+4,y+6,mountain);
  const onFlourish=(x>=340 && x<=1485 && y>=610 && y<=806) ||
    (x>=1395 && x<=1485 && y>=568 && y<=670) ||
    (y>=555 && y<=737 && Math.abs(x-(832-(y-530)*1.05))<26);
  const onCaption=x>=525 && x<=1390 && y>=818 && y<=893;
  if(!onMountain && !onFlourish && !onCaption) continue;
  let alpha=onMountain ? 1 : Math.max(0,Math.min(1,(195-low)/95));
  if(!onCaption && !onMountain && chroma>14) alpha=Math.max(alpha,Math.min(1,(chroma-14)/34));
  if(alpha<.025) continue;
  const target=onCaption ? caption : art;
  // The checker is neutral and light; reconstruct soft edges against its average tone.
  for(let c=0;c<3;c++) target[q+c]=onMountain || alpha===1 ? rgb[c] : Math.max(0,Math.min(255,Math.round(232-(232-rgb[c])/alpha)));
  target[q+3]=Math.round(alpha*255);
  const night=onCaption ? darkCaption : darkArt;
  const ink=onCaption || (low<100 && (!onMountain || (x<1030 && y>x*.33+399) || y>750));
  for(let c=0;c<3;c++) night[q+c]=ink ? Math.round([239,242,232][c]-(low-15)*.22) : target[q+c];
  night[q+3]=target[q+3];
}
const lower = await sharp(art,{raw:{width:info.width,height:info.height,channels:4}}).png().toBuffer();
const label = await sharp(caption,{raw:{width:info.width,height:info.height,channels:4}}).png().toBuffer();
const lowerDark = await sharp(darkArt,{raw:{width:info.width,height:info.height,channels:4}}).png().toBuffer();
const labelDark = await sharp(darkCaption,{raw:{width:info.width,height:info.height,channels:4}}).png().toBuffer();
const signature=await fs.readFile(path.join(brandRoot,'signature/the-wizards.svg'),'utf8');
const signatureBody=signature.replace(/^<svg[^>]*>/,'').replace(/<title[^>]*>[^<]*<\/title>/,'').replace(/<\/svg>\s*$/,'');
const embedded=b=>'data:image/png;base64,'+b.toString('base64');
const header='<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="860" viewBox="0 60 1536 860" role="img" aria-labelledby="title"><title id="title">The Wizard\'s Ecosystem</title>';
const compose=(drawing,label,signature,pigment)=>header+'<image width="1536" height="1024" href="'+embedded(drawing)+'"/><path d="M825 519L828 519C823 531 815 545 808 556L795 556C804 544 816 530 825 519Z" fill="'+pigment+'"/><g transform="translate(1 81) scale(4)">'+signature+'</g><image width="1536" height="1024" href="'+embedded(label)+'"/></svg>\n';
const svg=compose(lower,label,signatureBody.replaceAll('#272522','#1D3035'),'#1D3035');
const darkSvg=compose(lowerDark,labelDark,signatureBody.replaceAll('#272522','#F7F6F2'),'#F0F3E9');
return {light:svg,dark:darkSvg,art:lower,caption:label};
}

export async function buildEcosystem(brandRoot,writeExport){
const sourceRoot=path.join(brandRoot,'source/ecosystem');
const artwork=await composeEcosystem(brandRoot,sourceRoot);
const emit=(name,data,role,transparent=false)=>writeExport('ecosystem/'+name,data,{role,transparent});
const body=svg=>svg.replace(/^<svg[^>]*>/,'').replace(/<title[^>]*>[^<]*<\/title>/,'').replace(/<\/svg>\s*$/,'').replace(/[ \t]+$/gm,'').trim();
const wrap=(w,h,title,inside,viewBox='0 0 '+w+' '+h)=>'<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="'+viewBox+'" role="img" aria-labelledby="title"><title id="title">'+title+'</title>'+inside+'</svg>\n';
const full={},icon={};
for(const mode of ['light','dark']){
  const suffix=mode==='light'?'':'-dark';
  full[mode]=artwork[mode];
  icon[mode]=await fs.readFile(path.join(sourceRoot,'mountain-icon'+suffix+'.svg'),'utf8');
  await emit('ecosystem-logo'+suffix+'.svg',full[mode],'logo',true);
  await emit('ecosystem-logo'+suffix+'.png',await sharp(Buffer.from(full[mode])).resize(1200).png({compressionLevel:9}).toBuffer(),'logo',true);
  await emit('ecosystem-icon'+suffix+'.svg',icon[mode],'icon',true);
  await emit('ecosystem-icon'+suffix+'.png',await sharp(Buffer.from(icon[mode])).resize(256).png({compressionLevel:9}).toBuffer(),'icon',true);
}
const auto=(a,b)=>'<style>.night{display:none}@media(prefers-color-scheme:dark){.day{display:none}.night{display:block}}</style><g class="day">'+body(a)+'</g><g class="night">'+body(b)+'</g>';
await emit('ecosystem-logo-auto.svg',wrap(1536,860,"The Wizard's Ecosystem",auto(full.light,full.dark),'0 60 1536 860'),'logo',true);
await emit('ecosystem-icon-auto.svg',wrap(128,128,"The Wizard's Ecosystem mountain mark",auto(icon.light,icon.dark)),'icon',true);
const social=wrap(1200,630,"The Wizard's Ecosystem",'<rect width="1200" height="630" fill="#F7F6F2"/><svg x="100" y="35" width="1000" height="560" viewBox="0 60 1536 860">'+body(full.light)+'</svg>');
await emit('ecosystem-social.svg',social,'social');
await emit('ecosystem-social.png',await sharp(Buffer.from(social)).png({compressionLevel:9}).toBuffer(),'social');
const avatar=wrap(500,500,"The Wizard's Ecosystem mountain mark",'<rect width="500" height="500" fill="#F7F6F2"/><g transform="translate(58 26) scale(3)">'+body(icon.light)+'</g>');
await emit('ecosystem-avatar.png',await sharp(Buffer.from(avatar)).png({compressionLevel:9}).toBuffer(),'avatar');
await emit('apple-touch-icon.png',await sharp(Buffer.from(avatar)).resize(180).png().toBuffer(),'touch-icon');
for(const size of [16,32])await emit('favicon-'+size+'.png',await sharp(Buffer.from(icon.light)).resize(size).png().toBuffer(),'favicon',true);
const png=await sharp(Buffer.from(icon.light)).resize(256).png().toBuffer();
const directory=Buffer.alloc(22);directory.writeUInt16LE(1,2);directory.writeUInt16LE(1,4);directory.writeUInt16LE(1,10);directory.writeUInt16LE(32,12);directory.writeUInt32LE(png.length,14);directory.writeUInt32LE(22,18);
await emit('favicon.ico',Buffer.concat([directory,png]),'favicon',true);
await emit('ecosystem-art.png',artwork.art,'illustration',true);
await emit('ecosystem-lockup.png',await sharp(Buffer.from(full.light)).resize(1200).png({compressionLevel:9}).toBuffer(),'illustration',true);
}
