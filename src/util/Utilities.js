export const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
}

export const parseMarkdownWithYamlFrontMatter = (md) => {
    const metaRegExp = new RegExp(/^---[\n\r](((?!---).|[\n\r])*)[\n\r]---$/m);

    const [header, vars] = metaRegExp.exec(md) ?? [];

    if(!header || !vars){
        return {markdown: md}
    }

    const keyValues = vars.split('\n')

    const frontmatter = Object.fromEntries(
        keyValues.map(keyValue => {
            const [key, value] = keyValue.split(':');
            return [key ?? keyValue, value?.trim() ?? ''];
        })
    ) 

    return { metadata: frontmatter, markdown: md.replace(header, '').trim()}
}

export const groupBy = (arr, key) => {
    key = (key instanceof Function) ? key(arr) : key
    return arr.reduce((acc, value) => {
        (acc[value[key]] = acc[value[key]] || []).push(value)
        return acc
    }, {})
}