export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <>
      <div className="mx-80 mt-10">
        <h1 className="font-bold text-5xl mb-5">Is this things is the right one...</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis justo orci, mattis pellentesque facilisis id, faucibus nec nisi. Nunc lectus leo, blandit vel fermentum at, congue eu leo. Fusce ornare ipsum et orci malesuada rhoncus. Suspendisse vestibulum metus vel mauris egestas tincidunt. Aliquam vel faucibus massa. Integer quis nisl nec sapien fringilla consectetur. Mauris eu nunc commodo, aliquet nisl eget, interdum metus. Suspendisse ornare orci orci, eu tempus felis convallis quis. Donec pharetra erat sit amet tempor tristique. Aliquam tempor ipsum id ipsum tincidunt imperdiet. Etiam quis augue orci. Vivamus nunc odio, fringilla in nunc sed, fringilla sollicitudin felis. Quisque finibus, ante a gravida finibus, neque elit dictum nulla, ac egestas enim orci vel orci. Quisque purus leo, ullamcorper in mi sed, ornare tristique quam. Fusce urna ex, rutrum nec lacus sit amet, sagittis sagittis metus. Donec tellus mauris, tristique blandit pharetra id, condimentum a elit.
        </p>
        <p>
          Duis tristique diam finibus mollis elementum. Praesent tempor id elit non vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer bibendum tempor ultrices. Aenean bibendum lectus sit amet massa condimentum tempor. Cras dignissim, nunc quis eleifend dignissim, nisi lorem dictum nunc, tristique condimentum lacus magna ut augue. Cras erat eros, egestas ut pellentesque ut, finibus ut nisl.
        </p>
        <p>
          Donec volutpat sollicitudin sapien gravida semper. Cras vulputate interdum iaculis. Duis auctor a metus id aliquam. Nunc quam ipsum, fringilla ac dictum semper, dictum et felis. Aenean in dolor ac urna viverra tincidunt a eget tortor. Etiam accumsan orci a placerat porta. Praesent at ipsum diam.
        </p>
      </div>
    </>
  )
}
